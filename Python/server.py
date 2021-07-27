#server.py
import asyncio
import websockets

loop = asyncio.get_event_loop()

async def main(websocket, path):
    # This line recieves the image from NodeJS
    buffer = await websocket.recv()

    age = 10
    gender = 'male'
    location = 'cam1'
    date = '11PM'

    # This line sends data to NodeJS
    await websocket.send(buffer, age, gender, location, date)

start_server = websockets.serve(main, "0.0.0.0", 5432)
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
