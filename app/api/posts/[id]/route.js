import clientPromise from '../../../lib/mongodb'; // Adjust path as needed
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

export async function GET(request, { params }) {
  try {
    const client = await clientPromise; // Connect to MongoDB
    const db = client.db('test'); // Replace with your database name
    const collection = db.collection('Posts'); // Replace with your collection name

    const { id } = params; // Dynamic ID from the URL

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }

    const data = await collection.findOne({ _id: new ObjectId(id) }); // Fetch document by ID

    if (!data) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(data); // Return the fetched document as JSON
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
