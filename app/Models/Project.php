<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
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

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }

    public function expenses(): HasMany
    {
        return $this->hasMany(Expense::class);
    }

    public function sub_contracts(): HasMany
    {
        return $this->hasMany(SubContract::class);
    }

    public function purchases(): HasMany
    {
        return $this->hasMany(Purchase::class);
    }

    public function client_payments(): HasMany
    {
        return $this->hasMany(ClientPayment::class);
    }

    public function day_logs(): HasMany
    {
        return $this->hasMany(DayLog::class);
    }
}
