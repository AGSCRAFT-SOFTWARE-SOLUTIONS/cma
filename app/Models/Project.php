<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'name',
        'location',
        'category',
        'client_id',
        'budget',
        'start_date',
        'completion_date',
        'description',
    ];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function sub_contracts()
    {
        return $this->hasMany(SubContract::class);
    }

    public function expenses()
    {
        return $this->hasMany(Expense::class);
    }

    public function client_payments()
    {
        return $this->hasMany(ClientPayment::class);
    }
}
