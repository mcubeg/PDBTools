# This function will return Nothing for alternate (BGLY, CARG, etc) conformations
# of protein residues, which will then be ignored. Only "A" conformations are kept.
# Other non-protein residues are always kept.

function alternate_conformation( atom :: Union{Atom,MutableAtom} )
  if isprotein(atom) 
    if length(atom.resname) == 4
      if atom.name[1:1] == "A"
        return atom.resname[2:4]
      else 
        return Nothing
      end
    else
      return atom.resname
    end
  else
    return atom.resname
  end
end

#
# Function that tries to read a number as an integer given a number
# or, perhaps, an hexadecimal representation string
#

function parse_int(s :: String)
  try
    i = parse(Int64,s)
    return i
  catch
    i = parse(Int64,s,base=16)
    return i
  end
  error("Could not read integer from string: \"$s\"")
end

#
# Function that reads atom information from PDB or mmCIF files
#

function read_atom(record :: String; 
                   mmCIF :: Bool = false, 
                   mmCIF_fields :: Indexes_mmCIF_fields = empty_struct(Indexes_mmCIF_fields))

  atom = MutableAtom()

  if length(record) < 6
    return Nothing
  end

  if record[1:4] == "ATOM" || record[1:6] == "HETATM" 

    if ! mmCIF

      atom.name = strip(record[13:16])

      atom.resname = strip(record[17:21])
      resname = alternate_conformation(atom)
      if resname == Nothing
        return Nothing
      else
        atom.resname = resname
      end

      atom.chain = strip(record[22:22])
      if atom.chain == " "
        atom.chain = "0"
      end

      atom.index = parse_int(record[7:11])
      atom.resnum = parse_int(record[23:26])
      atom.x = parse(Float64,record[31:38])
      atom.y = parse(Float64,record[39:46])
      atom.z = parse(Float64,record[47:54])
      try
        atom.b = parse(Float64,record[61:66])
      catch
        atom.b = 0.
      end
      try 
        atom.occup = parse(Float64,record[56:60])
      catch
        atom.occup = 0.
      end

    else # if mmCIF

      mmcif_data = split(record)
      atom.index = parse(Int64,mmcif_data[mmCIF_fields.index])
      atom.name = mmcif_data[mmCIF_fields.name]
      atom.resname = mmcif_data[mmCIF_fields.resname]
      resname = alternate_conformation(atom)
      if resname == Nothing
        return Nothing
      else
        atom.resname = resname
      end
      atom.chain = mmcif_data[mmCIF_fields.chain]
      try
        atom.resnum = parse(Int64,mmcif_data[mmCIF_fields.resnum])
      catch
        atom.resnum = 0
      end
      atom.x = parse(Float64,mmcif_data[mmCIF_fields.x])
      atom.y = parse(Float64,mmcif_data[mmCIF_fields.y])
      atom.z = parse(Float64,mmcif_data[mmCIF_fields.z])
      atom.b = parse(Float64,mmcif_data[mmCIF_fields.b])
      atom.occup = parse(Float64,mmcif_data[mmCIF_fields.occup])

    end

    return atom 

  else

    return Nothing

  end
  
end
