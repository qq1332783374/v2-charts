export const withInstall = (options) => {
    options.install = (app) => {
        app.component(options.name, options)
    }
    return options
}
