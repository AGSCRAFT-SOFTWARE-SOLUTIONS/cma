<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\ClientPayment;
use App\Models\Expense;
use App\Models\Product;
use App\Models\Purchase;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Exception;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): void
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): void
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // return $request;
        $data = $request->validate([
            'type' => 'required|in:purchase,client_payment,wage',
            'client_id' => 'required_if:type,client_payment|prohibited_unless:type,client_payment',
            'products' => 'required_if:type,purchase|array|min:1',
            'products.*.type' => 'required_if:type,purchase|prohibited_unless:type,purchase|in:business,others',
            'products.*.name' => 'required_if:type,purchase',
            'products.*.total' => 'required_if:type,purchase|numeric|gt:0',
            'products.*.hsn_sac' => 'required_if:products.*.type,business|nullable',
            'products.*.unit' => 'required_if:products.*.type,business|nullable',
            'products.*.uom' => 'required_if:products.*.type,business|nullable',
            'products.*.unit_price' => 'required_if:products.*.type,business|nullable',
            'products.*.c_gst' => 'required_if:products.*.type,business|nullable',
            'products.*.s_gst' => 'required_if:products.*.type,business|nullable',
            'account_id' => 'required',
            'project_id' => 'required',
            'created_at' => 'required',
            'amount' => 'required|numeric|gt:0',
            'payment_method' => 'required|in:UPI,Card,Net banking,Bank Transfer,Cheque',
            'note' => 'nullable',
        ]);

        $data['pre_balance'] = Account::find($data['account_id'])->balace;
        $data['post_balance'] = $data['pre_balance'] + $data['amount'];

        DB::beginTransaction();
        switch ($request['type']) {
            case 'client_payment':
                $transaction = Transaction::create($data);
                $client_payment = ClientPayment::create([
                    'transaction_id' => $transaction['id'],
                    ...$data
                ]);
                DB::commit();
                break;
            case 'purchase':
                $transaction = Transaction::create($data);
                $purchase = Purchase::create($data);
                $expense = Expense::create([
                    'project_id' => $data['project_id'],
                    'expensable_id' => $purchase['id'],
                    'expensable_type' => Purchase::class,
                    'transaction_id' => $transaction['id']
                ]);
                $products = $request->input('products');
                foreach ($products as $product) {
                    Product::create([
                        ...$product,
                        'purchase_id' => $purchase->id,
                    ]);
                }
                DB::commit();
                break;

            default:
                break;
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): void
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id): void
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): void
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): void
    {
        //
    }
}
