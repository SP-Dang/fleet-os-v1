// Get these from your Supabase Project Settings > API
const SUPABASE_URL = https://unaeguquzlvjmiebxsvg.supabase.co
const SUPABASE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVuYWVndXF1emx2am1pZWJ4c3ZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwNDk5MTAsImV4cCI6MjA5MTYyNTkxMH0.m6kCJus2-oHlzvmVxfFtbedKPbf8ricpQdIOQeB0fVg

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY)

async function fetchVehicles() {
    const grid = document.getElementById('vehicle-grid')
    const status = document.getElementById('connection-status')

    try {
        const { data, error } = await supabaseClient
            .from('vehicles')
            .select('*')

        if (error) throw error

        status.innerHTML = "● Connected"
        status.className = "px-3 py-1 rounded-full text-xs bg-green-900 text-green-300"

        grid.innerHTML = data.map(vehicle => `
            <div class="bg-slate-800 p-5 rounded-xl border border-slate-700 hover:border-blue-500 transition-colors">
                <div class="flex justify-between items-start mb-2">
                    <h3 class="font-bold text-lg">${vehicle.make_model}</h3>
                    <span class="text-xs font-mono bg-slate-700 px-2 py-1 rounded">${vehicle.license_plate}</span>
                </div>
                <p class="text-slate-400 text-sm capitalize mb-4">${vehicle.vehicle_type}</p>
                <div class="flex items-center">
                    <span class="w-3 h-3 rounded-full mr-2 ${vehicle.status === 'available' ? 'bg-green-500' : 'bg-red-500'}"></span>
                    <span class="text-sm uppercase tracking-wider font-semibold">${vehicle.status}</span>
                </div>
            </div>
        `).join('')

    } catch (err) {
        console.error('Error:', err)
        status.innerHTML = "● Connection Failed"
        status.className = "px-3 py-1 rounded-full text-xs bg-red-900 text-red-300"
    }
}

fetchVehicles()