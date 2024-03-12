<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        "transaction_id",
        "project_id",
        "sub_contract_id",
    ];

    public function transaction()
    {
        return $this->belongsTo(Transaction::class);
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function subContract()
    {
        return $this->belongsTo(SubContract::class);
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
