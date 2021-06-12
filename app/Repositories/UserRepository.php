<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository
{
    public static function create($name, $email, $password)
    {
        $user = new User();
        $user->name = $name;
        $user->email = $email;
        $user->password = bcrypt($password);
        $user->save();

        return $user;
    }
}