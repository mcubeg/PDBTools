"""

```
Residue(atoms::AbstractVector{Atom}, range::UnitRange{Int})
```

Residue data structure. It contains two fields: `atoms` which is a vector of
`Atom` elements, and `range`, which indicates which atoms of the `atoms` vector
compose the residue.

The Residue structure carries the properties of the residue or molecule of the atoms
it contains, but it does not copy the original vector of atoms, only the residue
meta data for each residue.

### Example

```julia-repl
julia> pdb = wget("1LBD");

julia> residues = collect(eachresidue(pdb))
   Array{Residue,1} with 238 residues.

julia> resnum.(residues[1:3])
3-element Vector{Int64}:
 225
 226
 227

julia> residues[5].chain
"A"

julia> residues[8].range
52:58

```

"""
struct Residue{T<:AbstractVector{Atom}}
  atoms::T
  range::UnitRange{Int}
  name::String
  resname::String
  residue::Int
  resnum::Int
  chain::String
  model::Int
  segname::String
end
name(residue::Residue) = residue.name
resname(residue::Residue) = residue.resname
residue(residue::Residue) = residue.residue
resnum(residue::Residue) = residue.resnum
chain(residue::Residue) = residue.chain
model(residue::Residue) = residue.model
segname(residue::Residue) = residue.segname
mass(residue::Residue) = mass(@view residue.atoms[residue.range])

function Residue(atoms::AbstractVector{Atom}, range::UnitRange{Int})
  i = range[begin]
  # Check if the range effectivelly corresponds to a single residue (unsafe check)
  for j in range[begin]+1:range[end]
    if atoms[j].residue != atoms[i].residue
      error("Range $range does not correspond to a single residue or molecule.")
    end
  end
  Residue(atoms,range,
          atoms[i].resname, atoms[i].resname, atoms[i].residue,
          atoms[i].resnum, atoms[i].chain, atoms[i].model, atoms[i].segname)
end
Residue(atoms::AbstractVector{Atom}) = Residue(atoms,1:length(atoms))

function Base.getindex(residue::Residue,i) 
  @assert i > 0 "Index must be in 1:$(residue.range[end]-residue.range[begin])"
  @assert (i <= length(residue.range)) "Residue has $(residue.range[end]-residue.range[begin]+1) atoms."
  i = residue.range[begin] + i - 1
  residue.atoms[i]
end

#
# Structure and function to define the eachresidue iterator
#
struct EachResidue{T<:AbstractVector{Atom}}
  atoms::T
end

"""

```
eachresidue(atoms::AbstractVector{Atom})
```

Iterator for the residues (or molecules) of a selection. 

### Example

```julia-repl
julia> atoms = wget("1LBD");

julia> length(eachresidue(atoms))
238

julia> for res in eachresidue(atoms)
         println(res)
       end
 Residue of name SER with 6 atoms.
   index name resname chain   resnum  residue        x        y        z  beta occup model segname index_pdb
       1    N     SER     A      225        1   45.228   84.358   70.638 67.05  1.00     1       -         1
       2   CA     SER     A      225        1   46.080   83.165   70.327 68.73  1.00     1       -         2
       3    C     SER     A      225        1   45.257   81.872   70.236 67.90  1.00     1       -         3
       4    O     SER     A      225        1   45.823   80.796   69.974 64.85  1.00     1       -         4
       5   CB     SER     A      225        1   47.147   82.980   71.413 70.79  1.00     1       -         5
       6   OG     SER     A      225        1   46.541   82.639   72.662 73.55  1.00     1       -         6

 Residue of name ALA with 5 atoms.
   index name resname chain   resnum  residue        x        y        z  beta occup model segname index_pdb
       7    N     ALA     A      226        2   43.940   81.982   70.474 67.09  1.00     1       -         7
       8   CA     ALA     A      226        2   43.020   80.825   70.455 63.69  1.00     1       -         8
       9    C     ALA     A      226        2   41.996   80.878   69.340 59.69  1.00     1       -         9
                                                      ...

```

"""
eachresidue(atoms::AbstractVector{Atom}) = EachResidue(atoms)

# Collect residues default constructor
Base.collect(r::EachResidue) = collect(Residue,r)

#
# Iterate over the resiudes
#
function Base.iterate(residues::EachResidue, state=1)
  r0 = state
  r0 > length(residues.atoms) && return nothing
  residue0 = residues.atoms[r0].residue
  r1 = r0
  while r1 <= length(residues.atoms)
    if residues.atoms[r1].residue != residue0 
      return (Residue(residues.atoms,r0:r1-1),r1)
    end
    r1 += 1
  end
  return (Residue(residues.atoms,r0:r1-1),r1)
end

#
# Iterate over atoms of one residue
#
function Base.iterate(residue::Residue, state=1)
  i1 = residue.range[begin] + state - 1
  if i1 <= residue.range[end]
    return (residue.atoms[i1],state+1)
  else
    return nothing
  end
end

#
# Length of the Residue struct and eachresidue iterator (number of residues)
#
Base.length(residues::EachResidue) = sum( 1 for residue in residues )
Base.length(residue::Residue) = length(residue.range)

#
# io show functions
#
function Base.show(io::IO, residue::Residue)
  natoms = residue.range[end]-residue.range[begin]+1
  println(" Residue of name $(name(residue)) with $natoms atoms.")
  print_short_atom_list(@view residue.atoms[residue.range])
end

function Base.show(io::IO, residues::EachResidue)
  println(" Iterator with $(length(residues)) residues.")
end

function Base.show(io::IO,::MIME"text/plain", residues::AbstractVector{Residue} )
  println("   Array{Residue,1} with $(length(residues)) residues.")
end



