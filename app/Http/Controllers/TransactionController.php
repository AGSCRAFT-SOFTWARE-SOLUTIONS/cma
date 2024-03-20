<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\ClientPayment;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Exception;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'type' => 'required|in:purchase,client_payment,wage',
            'client_id' => 'required_if:type,client_payment|prohibited_unless:type,client_payment',
            'account_id' => 'required',
            'project_id' => 'required',
            'created_at' => 'required',
            'amount' => 'required',
            'payment_method' => 'required',
            'note' => 'nullable',
        ]);

        $data['pre_balance'] = Account::find($data['account_id'])->balace;
        $data['post_balance'] = $data['pre_balance'] + $data['amount'];

        DB::beginTransaction();
        try {
            switch ($request['type']) {
                case 'client_payment':
                    $transaction = Transaction::create($data);
                    $client_payment = ClientPayment::create([
                        'transaction_id' => $transaction['id'],
                        ...$data
                    ]);
                    DB::commit();
                    break;

                default:
                    break;
            }
        } catch (Exception $e) {
            return back()->withErrors('Unable to add this transaction: ' . $e->getMessage());
        }
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
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
