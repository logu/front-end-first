Js-Star : Du prototype à la production - Prototypage rapide
===================




Front end first philosophie sans aucun soucis
------------------------------------------------------
[TOC]



----------

Avant de rentrer dans le vif du sujet essayons tout d'abord de voir le context vers le quel le développement d'application tend vers.


----------

### La conception centrée utilisateur ###

La conception centrée utilisateur consiste à considérer les utilisateurs et leurs besoins tout au long du processus de développement d'une application. Les utilisateurs finaux sont les mieux placés pour évaluer et influencer le développement d'un produit. Si le produit final correspond à leurs besoins, envies et caractéristiques, il aura toutes les chances d'être adopté.
Vous vous dites surement mais pourquoi il nous parle de ça ? C'est très simple, c'est ce que l'on fait au quotidien chez nos clients à UX republic. 

![enter image description here](http://logu-kirou.com/img/conception_base_utilisateur.png)









On va s'intéresser plus particulièrement à la phase de développement de prototype. 

On distingue deux type de prototype: les lo-fi et les hi-fi. Les prototype lo-fi (low fidelity) sont plus souvent utiliser en phase de conception. On parle de wireframe, de mockup ou encore de maquette, souvent réaliser à la main pour itérer le plus possible. Ces itérations vont permettre d'émettre une hypothèse / une théorie qu'on viendra challenger par la suite en phase d'évaluation. C'est à ce moment qu'on parle alors de prototypage hi-fi (high fidelity), il s'agit d'une version de maquette html qui va permettre de faire des tests utilisateurs afin de valider l'analyse et la conception. L'implication du front end développeur dans cette phase est cruciale. 
Depuis très longtemps on a toujours mis une importance majeure au back-end et à la base de données lors du développement d'une application. Une nouvelle approche appelé 'front end first' vient questioner son efficacité. 

----------

### Quels sont les avantages de cette approche ?###

Le 'front end first' donne la possibilité du découplage entre l'application et le backend en apportant une couche d'abstraction des tâches backend. Cela permet au développeur front-end de mettre le focus sur l'expérience utilisateur et donne la flexibilité sur l'implémentation aux dévelopeur backend. Au final cette méthode nous amène à concevoir des backends clé en main qui peuvent être transverse. 

----------

### Un exemple d'implémentation ###

Cette repository a été mis en place pour illustrer une façon de développer en utilisant la méthode 'front end first'. Nous allons nous interroger sur la meilleure façon de développer notre front sans dépendre des API tout en impactant un minimum le code cible. Une stratégie pour simuler le backend et avoir des données bouchonnées.

Pour suivre la démo je vous invite à cloner le projet :

    git clone https://github.com/logu/front-end-first.git
    git checkout tags/v0.0.1




####Comment créer des bouchons de données ? ####

 - Données à partir d'[un fichier csv](https://docs.google.com/spreadsheets/d/11Qt8cUt8dh0hgmd21CoSi0rl9RDMvfBoQbQ-pEhmtgY/export?format=csv) :
	
	

    npm install --save-dev gulp-convert

>     var convert = require('gulp-convert');
>     
>     // data generation
>     gulp.task('data', function(){
>       gulp.src(['app/data/csv/*.csv'])
>         .pipe(convert({
>           from: 'csv',
>           to: 'json'
>          }))
>         .pipe(gulp.dest('app/data/json/'));
>     });
 
 
 - Données à partir d'un google spreadsheet

https://docs.google.com/spreadsheets/d/11Qt8cUt8dh0hgmd21CoSi0rl9RDMvfBoQbQ-pEhmtgY/pubhtml?gid=0&single=true

    npm install --save-dev gulp-json-editor gulp-google-spreadsheets

>     var gulpSheets = require('gulp-google-spreadsheets');
>     var jeditor = require("gulp-json-editor");
>     
>     var spreadsheetId = '11Qt8cUt8dh0hgmd21CoSi0rl9RDMvfBoQbQ-pEhmtgY';
>     
>     // data generation
>     gulp.task('fetch-data', function(){
>         gulpSheets(spreadsheetId)
>         .pipe(jeditor(function(json) {
>           return json.rows; 
>         }))
>         .pipe(gulp.dest('app/data/json/'))  
>     });

####Comment simuler une API pour implémenter le CRUD ? ####

