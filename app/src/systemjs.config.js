/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
    System.config({
        // map tells the System loader where to look for things
        map: {
            // our app is within the app folder
            app: '.',
            // angular bundles
            '@angular/core': 'lib/@angular/core/bundles/core.umd.min.js',
            '@angular/common': 'lib/@angular/common/bundles/common.umd.min.js',
            '@angular/compiler': 'lib/@angular/compiler/bundles/compiler.umd.min.js',
            '@angular/platform-browser': 'lib/@angular/platform-browser/bundles/platform-browser.umd.min.js',
            '@angular/platform-browser-dynamic': 'lib/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.min.js',
            '@angular/http': 'lib/@angular/http/bundles/http.umd.min.js',
            '@angular/router': 'lib/@angular/router/bundles/router.umd.min.js',
            '@angular/router/upgrade': 'lib/@angular/router/bundles/router-upgrade.umd.min.js',
            '@angular/forms': 'lib/@angular/forms/bundles/forms.umd.min.js',
            '@angular/upgrade': 'lib/@angular/upgrade/bundles/upgrade.umd.min.js',
            '@angular/upgrade/static': 'lib/@angular/upgrade/bundles/upgrade-static.umd.min.js',
            // other libraries
            'rxjs': 'lib/rxjs',
            'angular-in-memory-web-api': 'lib/angular-in-memory-web-api/bundles/in-memory-web-api.umd.js'
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            app: {
                main: './app.js',
                defaultExtension: 'js'
            },
            rxjs: {
                defaultExtension: 'js'
            }
        }
    });
})(this);