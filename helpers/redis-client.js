import redis from 'redis'

const redisClient = function(){
    const client = redis.createClient()
    client.on('connected', ()=>{
        console.log('redis client connected')
    })
    return client
}()

export default redisClient