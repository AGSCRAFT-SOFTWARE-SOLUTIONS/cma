<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        "account_id",
        "amount",
        "pre_balance",
        "post_balance",
        "payment_method",
        "note",
    ];

    public function account()
    {
        return $this->belongsTo(Account::class);
    }

    public function expense()
    {
        return $this->hasOne(Expense::class);
    }

    public function clientPayment()
    {
        return $this->hasOne(ClientPayment::class);
    }
}
