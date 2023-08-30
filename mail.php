<?php

header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
ini_set('display_errors',1);
if (
   

    isset($_GET['nom']) and !empty($_GET['nom']) and
    isset($_GET['prenom']) and !empty($_GET['prenom']) and
    isset($_GET['objet']) and !empty($_GET['objet']) and
    isset($_GET['message']) and !empty($_GET['message'])
) {

    require_once('./class/Sanitizing.php');

    $sanitizing = (object) new Sanitizing();

    $nom = $sanitizing->sanitizeString($_GET['nom']);
    $prenom = $sanitizing->sanitizeString($_GET['prenom']);
    $objet = $sanitizing->sanitizeString($_GET['objet']);
    $message = $sanitizing->sanitizeString($_GET['message']);

    $email="";

    // Definition des donnees du sujet
    $subject = (string)$objet;

    require_once('./configuration.php');


    // Definition du nom de domaine
    $domain = (string) $general['domain'];


    // Encodage en Base64 de l'adresse e-mail
    $encode = (string) base64_encode($email);

    // Definition des donnees du corps
    $body = <<<EOF
        <p>$nom $prenom</p>
        <p>$message</p>

    EOF;

    require_once('./class/Mailer.php');
    // Instanciation de la classe Mailer et creation de l'objet $mailer
    $mailer = (object) new Mailer();
    // Appel de methode "sendEmail(arguments)" pour definir les donnees et envoyer
    $mailer->sendEMail($email, $subject, $body);

    // retourne au navigateur le code HTTP pour preparer une redirection
    http_response_code(302);
    // ajoute dans l'en-tete la destination
    echo 'success';

    // arrete l'execution du PHP
    exit();
    
}





?>

