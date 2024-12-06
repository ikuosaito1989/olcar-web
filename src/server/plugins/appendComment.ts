export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:html', (html) => {
    html.head.unshift(`\n<!---
      
   #####   ####       ####     ##     ######
  ##   ##   ##       ##  ##   ####     ##  ##
  ##   ##   ##      ##       ##  ##    ##  ##
  ##   ##   ##      ##       ##  ##    #####
  ##   ##   ##   #  ##       ######    ## ##
  ##   ##   ##  ##   ##  ##  ##  ##    ##  ##
   #####   #######    ####   ##  ##   #### ##

  Thank you for using Olcar!
  Would you like to work with me? I'm looking forward to receiving your offer!

  Website: https://festive-yonath-a04e1e.netlify.app/
  Email  : ikuosaito1989@gmail.com

-->\n`)
  })
})
