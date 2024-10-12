import Link from "next/link";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Travel Tips & Guides</h3>
            <p className="text-sm">
              Discover the world with our expert travel tips and comprehensive
              destination guides.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-md mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/destinations"
                  className="hover:text-primary transition-colors"
                >
                  Destinations
                </Link>
              </li>
              <li>
                <Link
                  href="/tips"
                  className="hover:text-primary transition-colors"
                >
                  Travel Tips
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-md mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/category/adventure"
                  className="hover:text-primary transition-colors"
                >
                  Adventure
                </Link>
              </li>
              <li>
                <Link
                  href="/category/business-travel"
                  className="hover:text-primary transition-colors"
                >
                  Business Travel
                </Link>
              </li>
              <li>
                <Link
                  href="/category/exploration"
                  className="hover:text-primary transition-colors"
                >
                  Exploration
                </Link>
              </li>
              <li>
                <Link
                  href="/category/other"
                  className="hover:text-primary transition-colors"
                >
                  Other
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-md mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                <Facebook size={24} />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                <Twitter size={24} />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                <Instagram size={24} />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="mailto:contact@traveltips.com"
                className="hover:text-primary transition-colors"
              >
                <Mail size={24} />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Travel Tips & Destination Guides.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
