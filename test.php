<?php
require_once 'imageworkshop/src/PHPImageWorkshop/ImageWorkshop.php';
$layer = new ImageWorkshop(array(
    "imageFromPath" => "img/slide1.png",
));
$layer->resizeInPixel(200, 120, true, 0, 0, 'MM');
$layer->save(__DIR__."/img/2012", "q.png", true, null, 95);

?>
