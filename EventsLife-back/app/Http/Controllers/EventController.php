<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use Illuminate\Http\JsonResponse;

class EventController extends Controller
{
    
	public function index(): JsonResponse{
		$categories = Event::all();
		return response()->json($categories);
	}

	public function getByOrganizer($organizerId){
		$events = Event::where('organizer_id', $organizerId)->get();
		return response()->json($events);
	}
	
	public function store(Request $request){
		$validated = $request->validate([
			'name' => 'required|string|max:255',
			'description' => 'required|string',
			'location' => 'required|string',
			'date' => 'required|date',
			'start_date' => 'required|date_format:H:i',
			'end_date' => 'required|date_format:H:i|after_or_equal:start_date',
			'organizer_id' => 'required|exists:users,id',
			'category_id' => 'required|exists:categories,id',
			'price' => 'required|numeric',
			'capacity' => 'required|integer',
			'image' => 'nullable|string',
		]);

		// Crear el evento
		$event = Event::create($validated);

		return response()->json($event, 201); // 201 Created
	}

	public function destroy($id){
		$event = Event::findOrFail($id);
		$event->delete();
		
    	return response()->json(['message' => 'Evento eliminado']);
	}

	public function update(Request $request, $id){
		$event = Event::find($id);
		if (!$event) {
			return response()->json(['message' => 'Event not found'], 404);
		}

		$validated = $request->validate([
			'name' => 'sometimes|required|string|max:255',
			'description' => 'sometimes|required|string',
			'location' => 'sometimes|required|string',
			'date' => 'sometimes|required|date',
			'start_date' => 'sometimes|required|date_format:H:i',
			'end_date' => 'sometimes|required|date_format:H:i|after_or_equal:start_date',
			'organizer_id' => 'sometimes|required|exists:users,id',
			'category_id' => 'sometimes|required|exists:categories,id',
			'price' => 'sometimes|required|numeric',
			'capacity' => 'sometimes|required|integer',
			'image' => 'nullable|string',
		]);

		$event->update($validated);
		return response()->json($event);
	}
	
}
