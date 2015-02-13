def rand_color
  3.times.map{ (rand(16)).to_s(16) }.join
end

css = 11.times.map do |i|
  num = 2**(i + 1)
  [
    ".tile-#{num} {\n  background: ##{rand_color};\n}\n",
    ".tile-#{num}:after {\n  content: '#{num}';\n}\n",
    ".tile-#{num}-jeff {\n  background-image: url('images/jeff-#{num}.png');\n}\n",
  ].join
end.join

File.write("tiles.css", css)
