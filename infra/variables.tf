variable "tenancy_ocid" {
  type      = string
  sensitive = true
}

variable "user_ocid" {
  type      = string
  sensitive = true
}

variable "fingerprint" {
  type      = string
  sensitive = true
}

variable "private_key_path" {
  type    = string
  default = "~/.oci/oci_api_key.pem"
}

variable "compartment_ocid" { type = string }

variable "region" {
  type    = string
  default = "us-phoenix-1"
}

variable "availability_domain" {
  type    = string
  default = ""
}

variable "instance_shape" {
  type    = string
  default = "VM.Standard.E5.Flex"
}

variable "instance_ocpus" {
  type    = number
  default = 1
}

variable "instance_memory_gbs" {
  type    = number
  default = 6
}

variable "ssh_public_key" { type = string }

variable "app_name" {
  type    = string
  default = "portfolio-personal"
}

variable "cloudflare_api_token" {
  type      = string
  sensitive = true
  default   = "disabled"
}

variable "cloudflare_zone_id" {
  type    = string
  default = ""
}

variable "domain" {
  type    = string
  default = ""
}
