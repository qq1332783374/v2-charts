/**
 * 动态加载 eChart
 * 减少打包体积
 */
export const echartScriptLoad = () => {
    const ECHARTS_ID = 'echarts@5.1.2'
    return new Promise((resolve, reject) => {
        if (window.echarts) {
            resolve(window.echarts)
        } else {
            // 防止重复添加
            const echartsDom = document.getElementById(ECHARTS_ID)
            if (echartsDom) {
                document.head.removeChild(echartsDom)
            }
            // 第一次添加
            const script = document.createElement('script')
            script.id = ECHARTS_ID
            script.type = 'text/javascript'
            script.async = true
            script.src = 'https://cdn.jsdelivr.net/npm/echarts@5.1.2/dist/echarts.min.js'
            script.onerror = reject
            document.head.appendChild(script)
            script.onload = () => {
                resolve(window.echarts)
            }
        }
    })
}

/**
 * 生成随机id
 */
export const randomId = () => {
    let temp = []
    for (let i = 0; i < 6; i++) {
        let randomChar = String.fromCharCode(65 + Math.floor(Math.random() * 19) + i)
        temp.push(randomChar)
    }
    return temp.reduce((pre, next) => pre + next)
}

export const withInstall = (options) => {
    options.install = (app) => {
        app.component(options.name, options)
    }
    return options
}

export function isHasChartsComponent() {
    const isHas = this.$parent.componentName !== '_charts' || !this.$parent.setOptions
    if (isHas) {
        console.error('请配合 Charts 组件使用');
    }
    return isHas
}

/**
 * @desc ECharts 自动选中
 * */
export function loopShowTooltip(chart, chartOption, options) {
    let defaultOptions = {
        interval: 2000,
        loopSeries: false,
        seriesIndex: 0,
        updateData: null
    }

    if (!chart || !chartOption) {
        return {}
    }

    let dataIndex = 0 // 数据索引，初始化为-1，是为了判断是否是第一次执行
    let seriesIndex = 0 // 系列索引
    let timeTicket = 0
    let seriesLen = chartOption.series.length // 系列个数
    let dataLen = 0 // 某个系列数据个数
    let chartType // 系列类型
    let first = true

    // 不循环series时seriesIndex指定显示tooltip的系列，不指定默认为0，指定多个则默认为第一个
    // 循环series时seriesIndex指定循环的series，不指定则从0开始循环所有series，指定单个则相当于不循环，指定多个
    // 要不要添加开始series索引和开始的data索引

    if (options) {
        options.interval = options.interval || defaultOptions.interval
        options.loopSeries = options.loopSeries || defaultOptions.loopSeries
        options.seriesIndex = options.seriesIndex || defaultOptions.seriesIndex
        options.updateData = options.updateData || defaultOptions.updateData
    } else {
        options = defaultOptions
    }

    // 如果设置的seriesIndex无效，则默认为0
    if (options.seriesIndex < 0 || options.seriesIndex >= seriesLen) {
        seriesIndex = 0
    } else {
        seriesIndex = options.seriesIndex
    }

    function autoShowTip() {
        function showTip() {
            // 判断是否更新数据
            if (dataIndex === 0 && !first && typeof options.updateData === 'function') {
                options.updateData()
                chart.setOption(chartOption)
            }

            let series = chartOption.series
            chartType = series[seriesIndex].type // 系列类型
            dataLen = series[seriesIndex].data.length // 某个系列的数据个数

            let tipParams = { seriesIndex: seriesIndex }
            switch (chartType) {
                case 'map':
                case 'pie':
                case 'chord':
                    tipParams.name = series[seriesIndex].data[dataIndex].name
                    break
                case 'radar': // 雷达图
                    tipParams.seriesIndex = seriesIndex
                    tipParams.dataIndex = dataIndex
                    break
                default:
                    tipParams.dataIndex = dataIndex
                    break
            }

            if (chartType === 'pie' || chartType === 'radar') {
                // 取消之前高亮的图形
                chart.dispatchAction({
                    type: 'downplay',
                    seriesIndex: options.loopSeries ? (seriesIndex === 0 ? seriesLen - 1 : seriesIndex - 1) : seriesIndex,
                    dataIndex: dataIndex === 0 ? dataLen - 1 : dataIndex - 1
                })

                // 高亮当前图形
                chart.dispatchAction({
                    type: 'highlight',
                    seriesIndex: seriesIndex,
                    dataIndex: dataIndex
                })
            }

            // 显示 tooltip
            tipParams.type = 'showTip'
            chart.dispatchAction(tipParams)

            dataIndex = (dataIndex + 1) % dataLen
            if (options.loopSeries && dataIndex === 0 && !first) { // 数据索引归0表示当前系列数据已经循环完
                seriesIndex = (seriesIndex + 1) % seriesLen
            }

            first = false
        }

        showTip()
        timeTicket = setInterval(showTip, options.interval)
    }

    // 关闭轮播
    function stopAutoShow() {
        if (timeTicket) {
            clearInterval(timeTicket)
            timeTicket = 0

            if (chartType === 'pie' || chartType === 'radar') {
                // 取消高亮的图形
                chart.dispatchAction({
                    type: 'downplay',
                    seriesIndex: options.loopSeries ? (seriesIndex === 0 ? seriesLen - 1 : seriesIndex - 1) : seriesIndex,
                    dataIndex: dataIndex === 0 ? dataLen - 1 : dataIndex - 1
                })
            }
        }
    }

    let zRender = chart.getZr()

    function zRenderMouseMove(param) {
        if (param.event) {
            // 阻止canvas上的鼠标移动事件冒泡
            param.event.cancelBubble = true
        }

        stopAutoShow()
    }

    // 离开echarts图时恢复自动轮播
    function zRenderGlobalOut() {
        if (!timeTicket) {
            autoShowTip()
        }
    }

    // 鼠标在echarts图上时停止轮播
    chart.on('mousemove', stopAutoShow)
    zRender.on('mousemove', zRenderMouseMove)
    zRender.on('globalout', zRenderGlobalOut)

    autoShowTip()

    window.clearChartLoop = function () {
        if (timeTicket) {
            clearInterval(timeTicket)
            timeTicket = 0
        }

        chart.off('mousemove', stopAutoShow)
        zRender.off('mousemove', zRenderMouseMove)
        zRender.off('globalout', zRenderGlobalOut)
    }

    return {
        clearLoop: function () {
            if (timeTicket) {
                clearInterval(timeTicket)
                timeTicket = 0
            }

            chart.off('mousemove', stopAutoShow)
            zRender.off('mousemove', zRenderMouseMove)
            zRender.off('globalout', zRenderGlobalOut)
        }
    }
}

