<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        "name",
        "cost",
        "type",
        "expense_id",
    ];

    public function expense()
    {
        return $this->belongsTo(Expense::class);
    }
}
