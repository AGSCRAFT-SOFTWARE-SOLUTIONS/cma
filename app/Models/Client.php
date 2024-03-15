<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'name',
        'phone',
        'address',
    ];

    public function client_payments()
    {
        return $this->hasMany(ClientPayment::class);
    }

    public function projects()
    {
        return $this->hasMany(Project::class);
    }
}
