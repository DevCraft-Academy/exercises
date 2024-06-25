def check_basenames_for_invalid_characters(root_dir)
  invalid_basenames = []

  Dir.glob("#{root_dir}/**/*").each do |path|
    basename = File.basename(path)

    if basename =~ /[\/\:\*\?\"\<\>\|]/
      invalid_basenames << basename
      puts "Invalid #{File.directory?(path) ? "folder" : "file"} name: #{basename}"
    end
  end

  if invalid_basenames.empty?
    puts "All file/folder valid"
  else
    puts "Found invalid file/folder names!"
    exit 1
  end
end

root_dir = "."
check_basenames_for_invalid_characters(root_dir)

