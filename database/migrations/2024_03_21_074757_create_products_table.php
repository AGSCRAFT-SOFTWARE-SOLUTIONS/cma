<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('hsn_sac')->nullable();
            $table->string('unit')->nullable();
            $table->string('uom')->nullable();
            $table->string('unit_price')->nullable();
            $table->string('c_gst')->nullable();
            $table->string('s_gst')->nullable();
            $table->string('total');
            $table->enum('type', ['business', 'others']);
            $table->foreignUuid('purchase_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
