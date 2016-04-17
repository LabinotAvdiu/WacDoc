<?php
namespace App\Model;

class Database
{

    private static $db;
    private static $dbuser = 'root';
    private static $dbname = 'wacdoc';
    private static $dbpass = 'root';
    private static $host = 'localhost';

    public static function get()
    {
        if (is_null(self::$db))
        {
            try
            {
                $dsn = 'mysql:host=' . self::$host . ';port=3306;dbname=' . self::$dbname;
                self::$db = new \PDO($dsn, self::$dbuser, self::$dbpass);
                self::$db->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
                self::$db->setAttribute(\PDO::ATTR_DEFAULT_FETCH_MODE, \PDO::FETCH_OBJ);
            } catch (\Exception $e)
            {
                die('Erreur : ' . $e->getMessage());
            }
        }
        return self::$db;
    }
}
?>