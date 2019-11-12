<?php
header('Access-Control-Allow-Origin: *');

sendRegisterInServiceRequest();

function sendRegisterInServiceRequest() {
    $paramNames = [
        'email',
        'phone',
        'source_name',
        'tags',
        'roistat_id',
        'public_key'
    ];
    $data = getExistingRequestValues($paramNames);
    $url = 'http://cloud.roistat.com/erp/api/register-in-service?'.http_build_query($data);
    file_get_contents($url);
}

/**
 * @param string $name
 * @return mixed
 */
function extractFromRequest($name) {
    return array_key_exists($name, $_REQUEST) ? $_REQUEST[$name] : null;
}

function getExistingRequestValues(array $paramNames) {
    $result = [];
    foreach ($paramNames as $name) {
        $value = extractFromRequest($name);
        if ($value !== null) {
            $result[$name] = $value;
        }
        if ($name === 'roistat_id' && array_key_exists('roistat_visit', $_COOKIE)) {
            $result['roistat_id'] = $_COOKIE['roistat_visit'];
        }
    }
    return $result;
}