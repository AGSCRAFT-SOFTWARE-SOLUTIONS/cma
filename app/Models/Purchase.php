<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\Model;

class Purchase extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = ['project_id'];

    public function expense(): MorphOne
    {
        return $this->morphOne(Expense::class, 'expensable');
    }

    public function products() {
        return $this->hasMany(Product::class);
    }
}
