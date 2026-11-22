resource "cloudflare_record" "portfolio" {
  count   = var.cloudflare_zone_id != "" && var.domain != "" ? 1 : 0
  zone_id = var.cloudflare_zone_id
  name    = var.domain
  content = oci_core_instance.portfolio.public_ip
  type    = "A"
  ttl     = 1
  proxied = true
}
