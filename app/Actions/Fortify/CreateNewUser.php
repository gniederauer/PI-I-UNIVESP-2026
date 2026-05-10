<?php

namespace App\Actions\Fortify;

use App\Concerns\PasswordValidationRules;
use App\Concerns\ProfileValidationRules;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules, ProfileValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        Validator::make($input, [
            ...$this->profileRules(),
            'password' => $this->passwordRules(),
            'nome_empresa' => ['required', 'string', 'max:255'],
            'whatsapp' => ['required', 'string', 'max:20'],
        ])->validate();

        $user = User::create([
            'name' => $input['name'],
            'email' => $input['email'],
            'password' => $input['password'],
        ]);

        $user->cliente()->create([
            'nome_solicitante' => $input['name'],
            'nome_empresa' => $input['nome_empresa'],
            'email' => $input['email'],
            'whatsapp' => $input['whatsapp'],
        ]);

        return $user;
    }
}
