alias sys='systemctl'
log() {
    journalctl -u $1 -f
}
