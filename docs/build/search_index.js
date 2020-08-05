var documenterSearchIndex = {"docs":
[{"location":"selections/#selections","page":"Selections","title":"Selection functions","text":"","category":"section"},{"location":"selections/","page":"Selections","title":"Selections","text":"A simple selection syntax is provided. Use it with, for example: ","category":"page"},{"location":"selections/","page":"Selections","title":"Selections","text":"atoms = PDBTools.select(atoms,\"protein and resnum < 30\")","category":"page"},{"location":"selections/","page":"Selections","title":"Selections","text":"Accepted boolean operators: and, or, and not. ","category":"page"},{"location":"selections/","page":"Selections","title":"Selections","text":"The accepted keywords for the selection are: ","category":"page"},{"location":"selections/","page":"Selections","title":"Selections","text":"Keyword Options Input value Example\nindex =,>,<,<=,>= Integer index <= 10\nname  String name CA\nresname  String resname ALA\nresnum =,>,<,<=,>= Integer resnum = 10\nchain  String chain A\nmodel  Integer model 1\nprotein   protein\nwater   water\nbeta =,>,<,<=,>= Real beta > 0.5\noccup =,>,<,<=,>= Real occup >= 0.3","category":"page"},{"location":"selections/#Retrieving-indexes-only","page":"Selections","title":"Retrieving indexes only","text":"","category":"section"},{"location":"selections/","page":"Selections","title":"Selections","text":"If only the indexes of the atoms are of interest, a specific function will directly return them:","category":"page"},{"location":"selections/","page":"Selections","title":"Selections","text":"indexes = PDBTools.selindex(atoms,\"protein and name CA\")\n","category":"page"},{"location":"selections/","page":"Selections","title":"Selections","text":"note: Note\nAll indexing is 1-based. Thus, the first atom of the structure is atom 1.","category":"page"},{"location":"auxiliary/#Some-auxiliary-functions-to-quickly-retrive-some-data","page":"Auxiliary functions","title":"Some auxiliary functions to quickly retrive some data","text":"","category":"section"},{"location":"auxiliary/#Get-the-protein-sequence","page":"Auxiliary functions","title":"Get the protein sequence","text":"","category":"section"},{"location":"auxiliary/","page":"Auxiliary functions","title":"Auxiliary functions","text":"To obtain a list of the residue names of the protein with three- and one-letter codes, use","category":"page"},{"location":"auxiliary/","page":"Auxiliary functions","title":"Auxiliary functions","text":"julia> seq = PDBTools.getseq(\"file.pdb\")\n76×2 Array{String,2}:\n \"VAL\"  \"V\"\n \"LYS\"  \"K\"\n ⋮      \n \"ARG\"  \"R\"\n \"GLY\"  \"G\"\n","category":"page"},{"location":"auxiliary/","page":"Auxiliary functions","title":"Auxiliary functions","text":"note: Note\nIf there is some non-standard protein residue in the sequence, inform the getseq function by adding a selection:julia> PDBTools.getseq(\"file.pdb\",\"protein or resname NEW\")\n76×2 Array{String,2}:\n \"VAL\"  \"V\"\n \"NEW\"  \"N\"\n ⋮      \n \"ARG\"  \"R\"\n \"GLY\"  \"G\"","category":"page"},{"location":"auxiliary/","page":"Auxiliary functions","title":"Auxiliary functions","text":"The getseq function can of course be used on an Atom list, accepts selections as the last argument, as well as the reading and writting functions:","category":"page"},{"location":"auxiliary/","page":"Auxiliary functions","title":"Auxiliary functions","text":"atoms = PDBTools.readPDB(\"file.pdb\")\nseq = PDBTools.getseq(atoms,\"chain A\")\n","category":"page"},{"location":"auxiliary/#Obtain-arrays-with-coordinates","page":"Auxiliary functions","title":"Obtain arrays with coordinates","text":"","category":"section"},{"location":"auxiliary/","page":"Auxiliary functions","title":"Auxiliary functions","text":"All atoms:","category":"page"},{"location":"auxiliary/","page":"Auxiliary functions","title":"Auxiliary functions","text":"julia> x = PDBTools.coor(atoms)\n1476×3 Array{Float64,2}:\n 38.03  49.56  35.45\n 38.12  52.85  37.52\n  ⋮\n 60.05  47.5   57.34\n 63.52  46.9   58.93\n","category":"page"},{"location":"auxiliary/","page":"Auxiliary functions","title":"Auxiliary functions","text":"Or use selections to retrive the coordinates of subsets of atoms:","category":"page"},{"location":"auxiliary/","page":"Auxiliary functions","title":"Auxiliary functions","text":"Calpha coordinates:","category":"page"},{"location":"auxiliary/","page":"Auxiliary functions","title":"Auxiliary functions","text":"julia> xCA = PDBTools.coor(atoms,\"name CA\")\n76×3 Array{Float64,2}:\n 38.03  49.56  35.45\n 38.12  52.85  37.52\n  ⋮\n 60.05  47.5   57.34\n 63.52  46.9   58.93\n","category":"page"},{"location":"installation/#Installation","page":"Installation","title":"Installation","text":"","category":"section"},{"location":"installation/","page":"Installation","title":"Installation","text":"A simple package to read and write Protein Data Bank files and work with them. Provides a simple selection syntax.","category":"page"},{"location":"installation/","page":"Installation","title":"Installation","text":"Install the package using the package manager:","category":"page"},{"location":"installation/","page":"Installation","title":"Installation","text":"julia> ] add PDBTools\n","category":"page"},{"location":"installation/","page":"Installation","title":"Installation","text":"and load it with","category":"page"},{"location":"installation/","page":"Installation","title":"Installation","text":"julia> using PDBTools\n","category":"page"},{"location":"readwrite/#Read-and-write-files","page":"Read and Write","title":"Read and write files","text":"","category":"section"},{"location":"readwrite/#Read-a-PDB-file","page":"Read and Write","title":"Read a PDB file","text":"","category":"section"},{"location":"readwrite/","page":"Read and Write","title":"Read and Write","text":"To read a PDB file and return a vector of atoms of type Atom, do:","category":"page"},{"location":"readwrite/","page":"Read and Write","title":"Read and Write","text":"atoms = PDBTools.readPDB(\"file.pdb\")\n","category":"page"},{"location":"readwrite/","page":"Read and Write","title":"Read and Write","text":"Atom is the structure of data containing the atom index, name, residue, coordinates, etc. For example, after reading a file (as shown bellow), a list of atoms with the following structure will be generated:","category":"page"},{"location":"readwrite/","page":"Read and Write","title":"Read and Write","text":"julia> atoms[1]\nPDBTools.Atom(1, 1, \"N\", \"MET\", \"A\", 1, 38.95, 49.3, 34.38, 0.0, 0.0, 1)\n","category":"page"},{"location":"readwrite/","page":"Read and Write","title":"Read and Write","text":"The data in the Atom structure is organized as follows:","category":"page"},{"location":"readwrite/","page":"Read and Write","title":"Read and Write","text":"struct Atom\n  index :: Int64 # the sequential index of the atom in the file\n  index_pdb :: Int64 # the number written in the index field of the PDB \n  name :: String\n  resname :: String\n  chain :: String\n  resnum :: Int64\n  x :: Float64\n  y :: Float64\n  z :: Float64\n  b :: Float64\n  occup :: Float64\n  model :: Int64\nend","category":"page"},{"location":"readwrite/","page":"Read and Write","title":"Read and Write","text":"tip: Tip\nFor all these reading and writting function, a final argument can be provided to read or write a subset of the atoms, following the selection syntax described  in the Selection section. For example:protein = PDBTools.readPDB(\"file.pdb\",\"protein\")orarginines = PDBTools.readPDB(\"file.pdb\",\"resname ARG\")","category":"page"},{"location":"readwrite/#Edit-a-PDB-file","page":"Read and Write","title":"Edit a PDB file","text":"","category":"section"},{"location":"readwrite/","page":"Read and Write","title":"Read and Write","text":"Using the editPDB function, a vector of the same structure as above is returned, but of MutableAtom type, meaning that the content of every field can be modified. For example:","category":"page"},{"location":"readwrite/","page":"Read and Write","title":"Read and Write","text":"julia> atoms = PDBTools.editPDB(\"file.pdb\")\n1500-element Array{PDBTools.Atom,1}:\n PDBTools.MutableAtom(1, 1, \"N\", \"MET\", \"X\", 1, 38.95, 49.3, 34.38, 0.0, 0.0, 1)\n PDBTools.MutableAtom(2, 2, \"H1\", \"MET\", \"X\", 1, 39.84, 49.01, 34.79, 0.0, 0.0, 1)\n PDBTools.MutableAtom(3, 3, \"H2\", \"MET\", \"X\", 1, 38.69, 48.52, 33.79, 0.0, 0.0, 1)\n PDBTools.MutableAtom(4, 4, \"H3\", \"MET\", \"X\", 1, 38.99, 50.19, 33.92, 0.0, 0.0, 1)\n ...\n\njulia> atoms[1].resname = \"AAA\"\n\"AAA\"\n\njulia> atoms[1]\nPDBTools.MutableAtom(1, 1, \"N\", \"AAA\", \"X\", 1, 38.95, 49.3, 34.38, 0.0, 0.0, 1)\n","category":"page"},{"location":"readwrite/#Write-a-PDB-file","page":"Read and Write","title":"Write a PDB file","text":"","category":"section"},{"location":"readwrite/","page":"Read and Write","title":"Read and Write","text":"To write a PDB file use the writePDB function, as:","category":"page"},{"location":"readwrite/","page":"Read and Write","title":"Read and Write","text":"PDBTools.writePDB(atoms,\"file.pdb\")\n","category":"page"},{"location":"readwrite/","page":"Read and Write","title":"Read and Write","text":"where atoms contain a list of atoms in the Atom or MutableAtom structures.","category":"page"},{"location":"readwrite/#Read-and-write-single-atom-lines","page":"Read and Write","title":"Read and write single-atom lines","text":"","category":"section"},{"location":"readwrite/","page":"Read and Write","title":"Read and Write","text":"PDBTools.read_atom(pdb_line): Given a line of a PDB file containing atom data, returns the data in a Atom structure. To convert the atom read with this function into a mutable structure, use atom = MutableAtom(atom).","category":"page"},{"location":"readwrite/","page":"Read and Write","title":"Read and Write","text":"PDBTools.write_atom(atom::Atom): Given an atom in the Atom structure, returns a string formatted in the PDB format, to be written to a file. ","category":"page"},{"location":"#PDBTools","page":"Home","title":"PDBTools","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"PDBTools is a simple package to read and write Protein Data Bank files, select atoms, and work with their coordinates.  ","category":"page"}]
}
