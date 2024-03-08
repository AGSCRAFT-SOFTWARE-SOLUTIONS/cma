<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('expenses', function (Blueprint $table) {
                        $table->uuid("id")->primary();
            $table->foreignUuid("transaction_id")->constrained()->onDelete("cascade");
            $table->foreignUuid("project_id")->constrained()->onDelete("cascade");
            $table->foreignUuid("sub_contract_id")->nullable()->constrained()->onDelete("cascade");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('expenses');
    }
};
