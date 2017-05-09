<?php
    $DB_NAME = 'civilengineering';

    /* Database Host */
    $DB_HOST = 'localhost';

    /* Your Database User Name and Passowrd */
    $DB_USER = 'root';
    $DB_PASS = 'zariaw12';

    $DB_TABLE = 'image_url';

    /* Establish the database connection */
    $mysqli = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);

    if (mysqli_connect_errno()) {
        printf("Connect failed: %s\n", mysqli_connect_error());
        exit();
    }

    $result = $mysqli->query('SELECT '.$DB_TABLE.' FROM civilrecords');

    /* Extract the information from $result */
    foreach($result as $r) {
      $url = (string) $r['image_url']; 
      echo "<img class=\"mySlides\" src=\"admin/assets/external_images/".$url."\" style=\"width:100%\">";
    }
?>