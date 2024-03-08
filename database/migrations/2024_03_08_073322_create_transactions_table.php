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
        Schema::create('transactions', function (Blueprint $table) {
             $table->uuid("id")->primary();
            $table->foreignUuid("account_id")->constrained()->onDelete("cascade");
            $table->integer("amount");
            $table->integer("pre_balance");
            $table->integer("post_balance");
            $table->enum("payment_method", ["UPI", "Card", "Net banking", "Bank Transfer", "Cheque"]);
            $table->longText("note");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
