require 'ffi-rzmq'

ctx = ZMQ::Context.new

address = "epgm://10.0.0.13;239.192.1.1:3055"

pub = ctx.socket ZMQ::PUB
res = pub.bind(address)
$stdout.puts "Pub connection: #{res}"

sub = ctx.socket ZMQ::SUB
sub.connect(address)
sub.setsockopt(ZMQ::SUBSCRIBE, "")

bla = Thread.new {
  $stdout.puts "started checking"
  loop do
    msg = ''
    sub.recv_string(msg, ZMQ::DONTWAIT)
    if msg != ""
      $stdout.puts "@sub: #{msg}"
      #break
    end
  end
}

5.times {
  sleep 1
  $stdout.puts "sending."
  pub.send_string("bla desde cuzco")
  $stdout.puts "sent."
}

sleep 10
