require 'ffi-rzmq'

ctx = ZMQ::Context.new
request = ctx.socket ZMQ::DEALER

request.connect("tcp://127.0.0.1:6000")
request.connect("tcp://127.0.0.1:6001")

count = 0

loop do
  request.send_string(nil, ZMQ::SNDMORE)
  request.send_string("msg nro.: #{count += 1}")
  # count += 1

  msg = ''
  request.recv_string(msg)
  if msg != ""
    puts "Response from: " + msg
  end
  sleep 1
end
