set tabstop=4
set shiftwidth=4 
set softtabstop=4

set autoindent
set smartindent
set nocompatible
set nohls
set number
set expandtab


syntax on

"strip trailing whitespace
nnoremap  <silent> <leader>ss m`:%s/\s\s*$//e<CR>``

"highlight whitespace
set list listchars=tab:>-,trail:.,extends:>,precedes:<
