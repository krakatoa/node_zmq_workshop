require 'ffi-rzmq'

ctx = ZMQ::Context.new

frontend = ctx.socket ZMQ::ROUTER

frontend.bind("tcp://127.0.0.1:8114")

loop do
  msg = []
  frontend.recv_strings(msg)
  puts msg.inspect
  frontend.send_strings([msg[0], msg[1], "Response to: #{msg[2]}"])
end
