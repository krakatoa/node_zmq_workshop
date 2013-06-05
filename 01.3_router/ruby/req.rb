require 'ffi-rzmq'

ctx = ZMQ::Context.new
request = ctx.socket ZMQ::REQ

request.connect("tcp://127.0.0.1:6000")
request.connect("tcp://127.0.0.1:6001")

count = 0

loop do
  request.send_string("msg nro.: #{count += 1}")
  # count += 1

  msg = ''
  request.recv_string(msg)
  puts "Response from: " + msg
  sleep 1
end
