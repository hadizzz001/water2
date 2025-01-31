import clientPromise from '../../lib/mongodb'; // Adjust path as needed
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const client = await clientPromise; // Connect to MongoDB
    const db = client.db('test'); // Replace with your database name
    const collection = db.collection('Posts'); // Replace with your collection name

    const data = await collection.find({}).toArray(); // Fetch all documents

    return NextResponse.json(data); // Return data as JSON
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
