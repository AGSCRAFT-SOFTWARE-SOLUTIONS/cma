<?php

namespace App\Http\Controllers;

use App\Models\DayLog;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class DayLogController extends Controller
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
        // return $request;
        $data = $request->validate([
            'project_id' => 'required',
            'date' => 'required',
            'work' => 'required',
            'workers_count' => 'required|numeric|gt:0',
            'in' => 'required',
            'out' => 'required',
            'note' => 'nullable',
            'images.*' => 'nullable|mimes:png,jpg,jpeg',
        ]);

        DB::beginTransaction();
        if (!empty($request['products'])) {
            $request['created_at'] = $request['date'];
            $request->headers->set('Accept', 'application/json');
            $purchase = (new TransactionController)->store($request);
            $data['purchase_id'] = $purchase['id'];
        }

        DayLog::create([$data]);
        DB::commit();

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $key => $image) {
                $filename = "$key." . $image->getClientOriginalExtension();
                // $img = Storage::putFileAs("logs/$log->id", $image, $filename);
            }
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
