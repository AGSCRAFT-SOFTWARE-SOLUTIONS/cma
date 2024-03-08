<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubContract extends Model
{
    use HasFactory, HasUuids;

        public function contractor()
    {
        return $this->belongsTo(Contractor::class);
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function expenses()
    {
        return $this->hasMany(Expense::class);
    }
}
