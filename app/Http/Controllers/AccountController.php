<?php

namespace App\Http\Controllers;

use App\Models\Account;
use Illuminate\Http\Request;

class AccountController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia("Accounts/IndexAccount", ["accounts" => Account::all()]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Accounts/CreateUpdateAccount", ["type" => "create", "isPage" => "true"]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Account::create($request->validate([
            "name" => "required",
            "balance" => "required|integer",
            "type" => "required|in:bank,advance",
        ]));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Account $account, Request $request)
    {
        $account->update($request->validate([
            "name" => "required",
            "balance" => "required|integer",
            "type" => "required|in:bank,advance",
        ]));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Account $account)
    {
        $account->delete();
    }
}
