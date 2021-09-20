const path = require("path")
const webpack  = require("webpack")
module.exports = {
    entry:'./Public/js/index.js',
    output:{
        path: path.resolve(__dirname, 'Public/dist'),
        filename:'bundle.js',
        publicPath:'/Public'
    },
    module:{
         rules:[
             {
                 test: /\.css$/,
                 use: [
                     'style-loader',
                     'css-loader'
                 ]
             }
         ]
    },
    plugins:[
        new webpack.ProvidePlugin({
            $:'jquery',
            jQuery:'jquery'
        })
    ]
}

