output "instance_public_ip" {
  value       = oci_core_instance.portfolio.public_ip
  description = "IP pública de la VM para SSH y el navegador."
}
output "vcn_id" { value = oci_core_vcn.portfolio.id }
output "subnet_id" { value = oci_core_subnet.public.id }
