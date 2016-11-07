npm install
ca c'est pour le maven build (ajoute l'executable grunt)
npm install -g grunt-cli
ca c'est pour le maven dependances (ajoute l'executable bower)
npm install -g bower

pour builder :
grunt

pour ajouter un plugin (pour minifier les js par exemple) ensuite il faut ajouter la tache dans grunt
npm install grunt-contrib-uglify

pour ajouter une dépendance
bower install underscore