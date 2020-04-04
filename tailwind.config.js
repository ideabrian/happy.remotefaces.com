/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
module.exports = {
    theme: {
        container: {
            center: true,
            padding: '2rem',
        },
        colors: {
            black:{
                default: '#333'
            },
            white: '#ffffff',
            green: {
                default: 'green'
            },
            purple: {
                default: '#541388' ,
                100: '#EDE8F2',
                200: '#E3D5F2',
                300: '#c6addb',
                400: '#a685c1',
                800: '#320b51'
            },  
            teal: {
                default: '#3d92ce',
                700: '#3277a8'
            },       
            pink: {
                default: '#db2763'
            },
            yellow: {
                default: '#f7d89e', //rose
                200: '#f7eddc',
                gold: '#efbc9b' //gold
            }
        }
    },
    variants: {},
    plugins: []
}
  